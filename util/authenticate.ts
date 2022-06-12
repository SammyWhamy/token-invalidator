interface SuccessfulAuthResult {
    success: true,
    submitter: string,
}

interface FailedAuthResult {
    success: false,
    error: string,
}

type AuthResult = SuccessfulAuthResult | FailedAuthResult;

export async function authenticate(token?: string): Promise<AuthResult> {
    if(!token)
        return {success: false, error: "Missing token"};

    const [type, key] = token.split(' ');

    if(type === "Bot") {
        if(key === process.env.API_TOKEN)
            return {success: true, submitter: "985202712964661289"};
        else
            return {success: false, error: "Invalid bot token"};
    } else if(type === "Bearer") {
        const response = await fetch(`https://discord.com/api/v10/users/@me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${key}`
            }
        });

        if(response.status !== 200)
            return {success: false, error: "Invalid bearer token"};

        const userinfo = await response.json();

        if(!userinfo.id)
            return {success: false, error: "Invalid bearer token"};

        return {success: true, submitter: userinfo.id};
    } else {
        return {success: false, error: "Invalid token type"};
    }
}

