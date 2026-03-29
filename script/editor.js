// script/editor.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Session & URL setup
  const session = localStorage.getItem('codemastery_session');
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
  const user = JSON.parse(session);

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('course');
  
  if (!courseId || !window.courseDatabase[courseId]) {
    alert("Invalid course ID");
    window.location.href = 'dashboard.html';
    return;
  }

  const course = window.courseDatabase[courseId];
  let currentLessonIndex = 0;

  // Load user progress
  const progressKey = `codemastery_progress_${user.id}`;
  let userProgress = JSON.parse(localStorage.getItem(progressKey)) || {
    js: { completedLessons: [] },
    html: { completedLessons: [] }
  };

  // Find first non-completed lesson
  for (let i = 0; i < course.lessons.length; i++) {
    if (!userProgress[courseId].completedLessons.includes(course.lessons[i].id)) {
      currentLessonIndex = i;
      break;
    }
  }

  // 2. DOM Elements
  const courseTitleEl = document.getElementById('course-title');
  const lessonTitleEl = document.getElementById('lesson-title');
  const lessonCounterEl = document.getElementById('lesson-counter');
  const lessonTheoryEl = document.getElementById('lesson-theory');
  const progressBarEl = document.getElementById('lesson-progress-bar');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnRun = document.getElementById('btn-run');
  const btnClear = document.getElementById('btn-clear-console');
  
  const consoleOutput = document.getElementById('console-output');
  const htmlPreview = document.getElementById('html-preview');
  const editorTab = document.getElementById('editor-tab');

  // 3. Initialize Ace Editor
  const editor = ace.edit("code-editor");
  editor.setTheme("ace/theme/tomorrow_night_eighties");
  editor.setFontSize("14px");
  editor.setOption("wrap", true);

  // 4. Render Lesson Logic
  function renderLesson() {
    const lesson = course.lessons[currentLessonIndex];
    
    courseTitleEl.textContent = course.title;
    lessonTitleEl.textContent = lesson.title;
    lessonCounterEl.textContent = `${currentLessonIndex + 1} / ${course.lessons.length}`;
    lessonTheoryEl.innerHTML = lesson.theory;
    
    // Update Progress UI
    const pct = Math.round((currentLessonIndex / course.lessons.length) * 100);
    progressBarEl.style.width = `${pct}%`;

    // Configure Editor
    if (lesson.isHTML) {
      editor.session.setMode("ace/mode/html");
      editorTab.innerHTML = `<i class="fa-brands fa-html5" style="color: #e34f26;"></i> <span>index.html</span>`;
      consoleOutput.style.display = 'none';
      htmlPreview.style.display = 'block';
    } else {
      editor.session.setMode("ace/mode/javascript");
      editorTab.innerHTML = `<i class="fa-brands fa-js" style="color: #f7df1e;"></i> <span>script.js</span>`;
      consoleOutput.style.display = 'block';
      htmlPreview.style.display = 'none';
      consoleOutput.innerHTML = "";
    }

    editor.setValue(lesson.initialCode, 1);

    // Pagination
    btnPrev.disabled = currentLessonIndex === 0;
    
    // Disable next button until they solve it
    if (userProgress[courseId].completedLessons.includes(lesson.id)) {
       btnNext.disabled = false;
       btnNext.classList.remove('btn-outline');
       btnNext.classList.add('btn-primary');
       btnNext.innerHTML = 'Next Lesson <i class="fa-solid fa-chevron-right"></i>';
    } else {
       btnNext.disabled = true;
       btnNext.classList.remove('btn-primary');
       btnNext.classList.add('btn-outline');
       btnNext.innerHTML = '<i class="fa-solid fa-lock"></i> Solve to Continue';
    }
  }

  // 5. Code Execution Engine
  btnRun.addEventListener('click', () => {
    const lesson = course.lessons[currentLessonIndex];
    const code = editor.getValue();
    
    // Animate button
    btnRun.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running...`;
    
    setTimeout(() => {
      let passed = false;
      let outputString = "";

      if (lesson.isHTML) {
        // Render HTML
        htmlPreview.srcdoc = code;
        try {
          passed = lesson.validator(code);
        } catch(e) { passed = false; }
        
      } else {
        // Execute JS - Safe mock execution using eval trap
        consoleOutput.innerHTML = "";
        
        // Trap console.log
        const originalLog = console.log;
        const logs = [];
        console.log = function(...args) {
          logs.push(args.join(' '));
          originalLog.apply(console, args);
        };

        try {
          // Execute the code
          const func = new Function(code);
          func();
          outputString = logs.join('\n');
          
          if (outputString) {
             consoleOutput.innerHTML = outputString;
          } else {
             consoleOutput.innerHTML = `<span style="color: #666;">// Script execution complete. No console output.</span>`;
          }

          // Validate
          passed = lesson.validator(code, outputString);
        } catch (error) {
          consoleOutput.innerHTML = `<span class="console-error">Error: ${error.message}</span>`;
          passed = false;
        } finally {
          // Restore log
          console.log = originalLog;
        }
      }

      // 6. Validation Resolution
      if (passed) {
        // Success animation
        if (!lesson.isHTML) {
          consoleOutput.innerHTML += `\n\n<strong style="color:var(--success);">✅ Test Passed! Unlocking next lesson...</strong>`;
        } else {
          btnRun.innerHTML = `<i class="fa-solid fa-check"></i> Great Job!`;
        }

        // Save Progress
        if (!userProgress[courseId].completedLessons.includes(lesson.id)) {
           userProgress[courseId].completedLessons.push(lesson.id);
           localStorage.setItem(progressKey, JSON.stringify(userProgress));
        }

        // Unlock styling
        btnNext.disabled = false;
        btnNext.classList.remove('btn-outline');
        btnNext.classList.add('btn-primary');
        btnNext.innerHTML = 'Next Lesson <i class="fa-solid fa-chevron-right"></i>';
        
      } else {
         if (!lesson.isHTML) {
            consoleOutput.innerHTML += `\n\n<span style="color:var(--warning);">❌ Verification Failed. Check the instructions and try again.</span>`;
         }
      }
      
      btnRun.innerHTML = `<i class="fa-solid fa-play"></i> Run Code`;
    }, 400); // Simulate processing time
  });

  // 7. Navigation
  btnNext.addEventListener('click', () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      currentLessonIndex++;
      renderLesson();
    } else {
      alert("Congratulations! You have completed the course!");
      window.location.href = "dashboard.html";
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentLessonIndex > 0) {
      currentLessonIndex--;
      renderLesson();
    }
  });

  btnClear.addEventListener('click', () => {
     consoleOutput.innerHTML = "";
  });

  // Initial Boot
  renderLesson();
});
