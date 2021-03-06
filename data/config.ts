export const config = {
    title: "Token Invalidator",
    subHeading: "Submit tokens here to invalidate them automatically.",
    lists: [
        {
            label: "Source code",
            url: "https://github.com/SammyWhamy/token-invalidator"
        },
        {
            label: "Token repository",
            url: "https://github.com/SammyWhamy/invalidate-tokens"
        },
        {
            label: "Submission history",
            url: "/history"
        }
        // {
        //     label: "Contact us"
        // },
        // {
        //     label: "Cookie policy"
        // }
    ],
    scopes: ["identify"],
    tokenRepo: {
        name: "invalidate-tokens",
        owner: "SammyWhamy",
        path: "tokens.md",
    },
    tokenCommit: {
        message: "Token added by {submitter}",
        manyMessage: "{count} tokens added by {submitter}",
        name: "TokenInvalidator",
    },
    loadingText: [
        "Invalidating tokens",
        "Loading tokens",
        "Fetching tokens",
        "Watching monkeys sort data",
        "Discord actually broke their token scanning regex once",
        "more stuff here"
    ]
}
