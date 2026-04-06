**Note that the instructions below are based on W3School's React tutorial (https://www.w3schools.com/react).**

To deploy this repository's React website, follow the instructions below:

1. In the terminal, clone the repository to its own folder with the following command:

`git clone https://github.com/Irving7954/React-Vite-Application`

2. If necessary, download the latest version of Node.js, which should also install the npm build tool.

3. Install the Vite build tool with the following command:

 `npm install -g create-vite`

4. Create your React application react-app-name with the following command:

`npm create vite@latest react-app-name -- --template react`

For reference, `react-app-name` will be the base folder for your application, which can be changed if you prefer.

5. In your base folder, replace the `src` folder's contents with the contents of this repository's `src` folder.

6. In the terminal, go to the base folder, and run the following command to install most of the dependencies:

`npm install`

7. Run the following command to install the missing SASS dependency:

`npm install sass`

8. To deploy the application locally at port 5173, run the following command:

`npm run dev`

9. Lastly, open `http://localhost:5173/` in your browser to view the expected website with a few forms created in React:

![Expected Forms Image](./screenshot.png)
