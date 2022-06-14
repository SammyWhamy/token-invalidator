export const config = {
    title: "Token Invalidator",
    subHeading: "Submit tokens here to invalidate them automatically.",
    lists: [
        // {
        //     label: "Token history"
        // },
        {
            label: "Source code",
            url: "https://github.com/SammyWhamy/token-invalidator"
        },
        {
            label: "Token repo",
            url: "https://github.com/SammyWhamy/invalidate-tokens"
        },
        {
          label: "History",
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
        name: "TokenInvalidator",
        email: "sam.teeuwisse123@gmail.com",
    }
}
