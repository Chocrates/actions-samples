const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
    try {
        const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
        const { number } = github.context.payload.issue;
        const token = core.getInput("github-token");

        core.debug("Before who to copy");
        const whoToCopy = core
            .getInput("who-to-copy")
            .split(",")
            .map((x) => `@${x}`)
            .join(",");

        const issueMessage = `Thank you for creating the issue!  We will review it and get back to you shortly  \n\ncc: ${whoToCopy}`;
        const client = (octokit = new github.GitHub(token));
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

main()
