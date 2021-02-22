const { main } = require("../main");

test("calls getInput twice", async () => {
    process.env.GITHUB_REPOSITORY = "owner/repo";
    octomock.getCoreImplementation().getInput.mockImplementation((param) => {
        return param;
    });
    await main();
    expect(octomock.mockFunctions.core.getInput).toHaveBeenCalledTimes(2);
});
