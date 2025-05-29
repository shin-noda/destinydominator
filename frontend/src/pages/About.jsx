import Navigationbar from '../components/Navigationbar.jsx';

const About = () => {
    return (
        <div>
            <Navigationbar />
            <h1
                className="top-message"
            >
                How to use Goal Tracker?
            </h1>
            <div
                className="project-explanation"
            >
                Achieving a goal can feel overwhelming. But breaking it down into smaller steps makes it more manageable. This app is designed to help you achieve your goals by organizing them into clear, actionable steps.<br></br>
                <br></br>
                Example:<br></br>
                Let’s say you want to pass a literature course. To do that, you need to read Book A and Book B. Book A has 100 pages, and Book B has 150 pages. In this case, your breakdown might look like this:<br></br>
                <br></br>
                Goal: Pass the literature course<br></br>
                    <div className="one-tab">Task 1: Read Book A</div>
                        <div className="two-tabs">Action 1: Read pages 1–50</div>
                        <div className="two-tabs">Action 2: Read pages 51–100</div>
                <br></br>
                    <div className="one-tab">Task 2: Read Book B</div>
                        <div className="two-tabs">Action 1: Read pages 1–100</div>
                        <div className="two-tabs">Action 2: Read pages 101–150</div>
                <br></br>
                This is just one example of how you can structure your goals.<br></br>
                <br></br>
                You can also visualize your progress on the Visualization page, accessible from the top menu bar.<br></br>
                <br></br>
                Good luck :)
            </div>
        </div>
    );
};
export default About;