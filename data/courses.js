// data/courses.js

const courseDatabase = {
  js: {
    title: "JavaScript Fundamentals",
    id: "js",
    lessons: [
      {
        id: "js-01-vars",
        title: "Introduction to Variables",
        theory: `
          <h2>Welcome to JavaScript ✨</h2>
          <p>Variables are containers for storing data values. Think of them as labeled boxes where you can keep information.</p>
          <p>In modern JavaScript, we declare variables using <code>let</code> (for values that can change) and <code>const</code> (for values that stay the same).</p>
          <div class="info-box">
             <strong>Task:</strong> Create a variable named <code>playerName</code> and assign it the string value <code>"Neo"</code>. Then use <code>console.log()</code> to print it.
          </div>
        `,
        initialCode: "// Use let or const to declare your variable\n\n",
        expectedOutput: "Neo",
        validator: function(code, output) {
          return output.trim() === this.expectedOutput && code.includes("playerName");
        }
      },
      {
        id: "js-02-types",
        title: "Primitive Data Types",
        theory: `
          <h2>Data Types</h2>
          <p>JavaScript variables can hold many data types: <strong>Numbers</strong>, <strong>Strings</strong>, and <strong>Booleans</strong>.</p>
          <ul>
            <li><code>String</code>: Text wrapped in quotes (e.g., <code>"Hello"</code>)</li>
            <li><code>Number</code>: Numbers without quotes (e.g., <code>42</code>)</li>
            <li><code>Boolean</code>: True or false values (e.g., <code>true</code>)</li>
          </ul>
          <div class="info-box">
             <strong>Task:</strong> Create a variable <code>isReady</code> and set it to the boolean value <code>true</code>. Create another variable <code>level</code> and set it to the number <code>5</code>. Print both variables using a single <code>console.log(isReady, level)</code>.
          </div>
        `,
        initialCode: "let isReady = \nlet level = \n\n",
        expectedOutput: "true 5",
        validator: function(code, output) {
          return output.includes("true 5") && code.includes("isReady") && code.includes("level");
        }
      },
      {
        id: "js-03-math",
        title: "Basic Operations",
        theory: `
          <h2>Math in JS</h2>
          <p>You can perform math operations in JavaScript using operators like <code>+</code> (addition), <code>-</code> (subtraction), <code>*</code> (multiplication), and <code>/</code> (division).</p>
          <div class="info-box">
             <strong>Task:</strong> Create a variable <code>score</code> and assign it the result of <code>100 * 5</code>. Print the <code>score</code> variable.
          </div>
        `,
        initialCode: "// Calculate the score here\n\n",
        expectedOutput: "500",
        validator: function(code, output) {
          return output.trim() === "500" && code.includes("*");
        }
      },
      {
        id: "js-04-logic",
        title: "Conditional Logic",
        theory: `
          <h2>If / Else Statements</h2>
          <p>Conditionals are used to perform different actions based on different conditions. They form the brain of your application!</p>
          <pre><code>if (health < 0) {\n  console.log("Game Over");\n} else {\n  console.log("Keep Playing");\n}</code></pre>
          <div class="info-box">
             <strong>Task:</strong> Create a variable <code>age = 18</code>. Write an <code>if/else</code> statement that prints <code>"Adult"</code> if age is 18 or greater, and <code>"Minor"</code> if not.
          </div>
        `,
        initialCode: "let age = 18;\n\n// Write your if/else statement below\n",
        expectedOutput: "Adult",
        validator: function(code, output) {
          return output.trim() === "Adult" && code.includes("if") && code.includes("else");
        }
      },
      {
        id: "js-05-arrays",
        title: "Arrays",
        theory: `
          <h2>Storing Multiple Values</h2>
          <p>An array is a special variable, which can hold more than one value at a time. They are incredibly useful for lists.</p>
          <p>Arrays are defined using square brackets <code>[]</code>.</p>
          <div class="info-box">
             <strong>Task:</strong> Create an array called <code>inventory</code> containing three strings: <code>"sword"</code>, <code>"shield"</code>, and <code>"potion"</code>. Print the whole array.
          </div>
        `,
        initialCode: "// Create your array here\n\n",
        expectedOutput: "sword shield potion", // Simple mock console.log of array usually joins comma or spaces depending on wrapper. Our mock prints stringified. Wait, args.join(' ')
        validator: function(code, output) {
          // Because our mock console does args.join(' '), an array might print its string representation.
          // Let's just check if the output includes the words.
          let outLower = output.toLowerCase();
          return outLower.includes("sword") && outLower.includes("shield") && outLower.includes("potion") && code.includes("[") && code.includes("]");
        }
      },
      {
        id: "js-06-loops",
        title: "For Loops",
        theory: `
          <h2>Don't Repeat Yourself (DRY)</h2>
          <p>Loops can execute a block of code a number of times. The most common loop is the <code>for</code> loop.</p>
          <pre><code>for (let i = 0; i < 3; i++) {\n  console.log(i);\n}</code></pre>
          <div class="info-box">
             <strong>Task:</strong> Write a <code>for</code> loop that prints the numbers from <code>1</code> to <code>5</code>, each on a new line. (Hint: let i = 1; i <= 5)
          </div>
        `,
        initialCode: "// Write your for loop here\n\n",
        expectedOutput: "1\n2\n3\n4\n5",
        validator: function(code, output) {
          return output.trim() === "1\n2\n3\n4\n5" && code.includes("for");
        }
      },
      {
        id: "js-07-functions",
        title: "Functions",
        theory: `
          <h2>Reusable Code Blocks</h2>
          <p>A JavaScript function is a block of code designed to perform a particular task when you "call" or "invoke" it.</p>
          <div class="info-box">
             <strong>Task:</strong> Write a function named <code>multiply</code> that takes two parameters (<code>a</code>, <code>b</code>) and returns their product. Then print the result of <code>multiply(4, 5)</code>.
          </div>
        `,
        initialCode: "function multiply(a, b) {\n  // return the math here\n}\n\n// print it here\n",
        expectedOutput: "20",
        validator: function(code, output) {
          return output.trim() === "20" && code.includes("function multiply");
        }
      }
    ]
  },
  html: {
    title: "HTML & CSS UI Design",
    id: "html",
    lessons: [
      {
        id: "html-01-intro",
        title: "Hello HTML",
        theory: `
          <h2>HTML Structure</h2>
          <p>HTML is the standard markup language for creating Web pages. Elements are the building blocks, enclosed by tags like <code>&lt;tag&gt;</code> and <code>&lt;/tag&gt;</code>.</p>
          <div class="info-box">
             <strong>Task:</strong> Create an <code>&lt;h1&gt;</code> element that says "Hello World". Then add a paragraph <code>&lt;p&gt;</code> below it saying "Welcome to my site".
          </div>
        `,
        initialCode: "<!-- Write your HTML here -->\n\n",
        isHTML: true,
        validator: function(code) {
          let cleaned = code.replace(/\s+/g, '').toLowerCase();
          return cleaned.includes("<h1>helloworld</h1>") && cleaned.includes("<p>welcometomysite</p>");
        }
      },
      {
        id: "html-02-links",
        title: "Links and Images",
        theory: `
          <h2>Connecting the Web</h2>
          <p>Links are created using the <code>&lt;a&gt;</code> anchor tag with an <code>href</code> attribute.</p>
          <p>Images use the self-closing <code>&lt;img&gt;</code> tag with a <code>src</code> attribute.</p>
          <div class="info-box">
             <strong>Task:</strong> Create a link that goes to <code>https://google.com</code> with the text "Go to Google".
          </div>
        `,
        initialCode: "<!-- Add your a tag below -->\n\n",
        isHTML: true,
        validator: function(code) {
          let cleaned = code.replace(/\s+/g, '').toLowerCase();
          return cleaned.includes("href=") && cleaned.includes("google.com");
        }
      },
      {
        id: "html-03-lists",
        title: "Lists",
        theory: `
          <h2>Organizing Content</h2>
          <p>HTML offers unordered lists <code>&lt;ul&gt;</code> and ordered lists <code>&lt;ol&gt;</code>. Inside the list, each item is wrapped in an <code>&lt;li&gt;</code> tag.</p>
          <div class="info-box">
             <strong>Task:</strong> Create an unordered list <code>&lt;ul&gt;</code> containing three <code>&lt;li&gt;</code> items: "Apples", "Bananas", and "Cherries".
          </div>
        `,
        initialCode: "<ul>\n  <!-- Add list items here -->\n\n</ul>",
        isHTML: true,
        validator: function(code) {
          let cleaned = code.replace(/\s+/g, '').toLowerCase();
          return cleaned.includes("<ul>") && cleaned.includes("<li>apples</li>") && cleaned.includes("<li>bananas</li>") && cleaned.includes("<li>cherries</li>");
        }
      },
      {
        id: "html-04-css_basics",
        title: "CSS Basics (Colors & Backgrounds)",
        theory: `
          <h2>Making it Beautiful</h2>
          <p>CSS (Cascading Style Sheets) is used to style your HTML. You can add it securely inside a <code>&lt;style&gt;</code> tag.</p>
          <pre><code>&lt;style&gt;\n  h1 {\n    color: red;\n  }\n&lt;/style&gt;</code></pre>
          <div class="info-box">
             <strong>Task:</strong> We have an <code>&lt;h1&gt;</code> tag. Add a <code>&lt;style&gt;</code> block above it, and change the h1's <code>color</code> to <code>blue</code> and <code>background-color</code> to <code>black</code>.
          </div>
        `,
        initialCode: "<!-- Add your style tag here -->\n\n\n<h1>Styling with CSS</h1>",
        isHTML: true,
        validator: function(code) {
          let cleaned = code.replace(/\s+/g, '').toLowerCase();
          return cleaned.includes("color:blue") && cleaned.includes("background-color:black") && cleaned.includes("h1{");
        }
      },
      {
        id: "html-05-classes",
        title: "Classes and IDs",
        theory: `
          <h2>Targeting Elements</h2>
          <p>Instead of styling all `+ "<code>&lt;p&gt;</code>" +` tags, we use <strong>Classes</strong> (<code>.classname</code>) or <strong>IDs</strong> (<code>#idname</code>).</p>
          <div class="info-box">
             <strong>Task:</strong> Apply the class <code>"highlight"</code> to the second paragraph. Then, inside the style tag, target <code>.highlight</code> and set its <code>color</code> to <code>yellow</code>.
          </div>
        `,
        initialCode: "<style>\n  /* Add your CSS class rule here */\n\n</style>\n\n<p>Normal paragraph.</p>\n<p>I want to be highlighted yellow!</p>",
        isHTML: true,
        validator: function(code) {
          let cleaned = code.replace(/\s+/g, '').toLowerCase();
          return cleaned.includes(".highlight{color:yellow") && cleaned.includes("class=\"highlight\"");
        }
      }
    ]
  }
};

window.courseDatabase = courseDatabase;
