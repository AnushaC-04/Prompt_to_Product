## Prompt -1 

task : 

to generate a website - python library study notes for fresher entry level

role :

 consider yourself as a Data oriented HR recruiter  in a top tech company with prior 45+ years of experience and experienced EDA analyst

goal : 

1. this website should focus on giving a complete understanding of python libraries like pandas , numpy ,  matplotlib , seaborn  in a proper standard structural format.

2. refer multiple related websites for reference.

3. website should look appealing that should interest the reader to focus and make them stay.
---
key expectation :

1. proper definition of what it is , where it is used , types, method and usage , syntax with small understandable example  using a simple real-world analogy.

2. notes should be understandable even by a grade 12 student .

3.  before presenting the result optimize the code 
---
user : 

complete fresher which no prior knowledge of python libraries .

role:

after generation of proper structured,

1.  assume yourself as a ui ux developer and a front end developer and generate a professional website .

2.  build an interactive website and include animation , gif whenever possible

3. use 3 to 4 colors and keep the user interface standard

---

## Prompt -2

Additional Information :

 1. Example:

 Empty Cells
   
Empty cells can potentially give you a wrong result when you analyze data.

Remove Rows

One way to deal with empty cells is to remove rows that contain empty cells.
This is usually OK, since data sets can be very big, and removing a few rows will not have a big impact on the result.

2. Example:

Return a new Data Frame with no empty cells: import pandas as pd

df = pd.read_csv('data.csv')

new_df = df.dropna()

print(new_df.to_string()) 

**Note: By default, the `dropna()` method returns a new DataFrame, and will not change the original.**

If you want to change the original DataFrame, use the `inplace = True` argument:

3. :

Example Remove all rows with NULL values: import pandas as pd

df = pd.read_csv('data.csv')

df.dropna(inplace = True)

print(df.to_string()) 

**Note: Now, the `dropna(inplace = True)` will NOT return a new DataFrame, but it will remove all rows containing NULL values from the original DataFrame.**

---

instructions:

1. include some additional informataion related to these python libraries.
2. refer the website like w3 school , geeksforgeeks for content format .
3. include individual examples for each method for better understanding.

expected output:

1. understanding for for fresher with no prior knowlegde 
2. interactive UI with some animation , action and sticker to make it look more fun 
3. include graphical representation of chart with example for each types or method when required in topics like matplotlib and reborn .
4. explain each chart in detail with definition , syntax , example with graph

---

## Prompt -3

Areas to focus :

1. graph size should be 640 x 480 pixels
2. graph should contain x , y label name mentioned .
3.  use black background for code cell 
4. ui is extremely basic add more some colors to highlight the uniqueness 
5. at the end of each library type include minimum 5 quick some multiple choose question 
6. for each wrong response mention the correct answer with proper reasoning

instruction:

1. remove or modify the ugly dotted square box which is not aligned properly 
2. Assume yourself as a UI UX developer with 35+ years of experience in skillfully developing the  User Interface 
3. make the interface more interactive , colorful 
4. take reference from multiple educational platforms  
5. "Act as an expert frontend developer. I am building an educational platform for freshers. Create a responsive grid of 'Subject Cards' using HTML, CSS, and Vanilla JS (or React/Framer Motion if you are using it). Animations required:
   1. When the page loads, the cards should stagger into view from the bottom with a spring easing.
   2. On mouse hover, the card should slightly lift up (translateY), cast a soft glowing drop-shadow matching the card's theme color, and a small decorative icon inside the card should gently bounce. Make the JS interactions smooth and ensure the hover state feels lightweight.

---

## Prompt -4

"I am building a web interface for my Data Analytics and Python notes, but I am running into two visual bugs that I need you to fix, optimize, and internally test before giving me the final code.
Issue 1: The UI (Frontend) The landing page currently has a working navbar, but the main hero section is completely empty.

* Task: Populate the front page with a clean, modern hero section using Flexbox or Grid. Add a headline, a brief subheadline, and a call-to-action button. Ensure the main container has appropriate padding (e.g., `padding: 4rem 2rem` or equivalent tailwind classes) so it looks balanced and responsive.

Issue 2: The Data Visualizations (Backend/Python) The Seaborn/Matplotlib pairplots showing 'study_hrs' and 'marks' are getting their bottom and right axes cut off.

* Task: Implement `plt.tight_layout(pad=2.0)` or `bbox_inches='tight'` to ensure all axis labels and subplots are fully visible. Make sure the figure size is appropriately scaled.

---

Execution Instructions:

1. Carefully review my attached code.
2. Implement the layout fixes for both the frontend and the Python scripts.
3. Perform a thorough internal dry-run of the code logic to verify that these changes do not break any existing functionality or CSS styles.
4. Optimize the code for performance and readability.
5. Output the final, production-ready code with absolutely no errors, glitches, or placeholders. Briefly explain the exact padding/layout properties you changed."

---
