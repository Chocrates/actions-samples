const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
    try {
        const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
        const { number } = github.context.payload.issue;
        const token = core.getInput("github-token");

        const whoToCopy = core
            .getInput("who-to-copy")
            .split(",")
            .map((x) => `@${x}`)
            .join(",");
        const aws_secret = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY";
        const issueMessage = `Thank you for creating the issue!  We will review it and get back to you shortly  \n\ncc: ${whoToCopy}`;
        const client = github.getOctokit(token);
        await client.issues.createComment({
            owner,
            repo,
            issue_number: number,
            body: issueMessage,
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = { main };

if(process.env.GITHUB_REPOSITORY){
    main();
}
