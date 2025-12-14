import arcjet, { shield, detectBot, tokenBucket, validateEmail } from "@arcjet/node";

const arcjetProtect = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE", 
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:PREVIEW",
            ]
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 5
        }),
    ]
});

const arcValidateEmail = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        validateEmail({
            mode: "LIVE",
            deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"]
        })
    ]
});