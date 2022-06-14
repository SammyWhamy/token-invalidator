import { useState } from 'react'
import 'vercel-toast/dist/vercel-toast.css'
import { createToast } from 'vercel-toast'

const linkRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z\d@:%._+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b[-a-zA-Z\d()@:%_+.~#?&\/=]*$/;

export default function TextInput({ data }) {
    const [token, setToken] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    const TokenInvalidator = async (i) => {
        i.preventDefault();

        if(link && !link.trim().match(linkRegex)) {
            setLink('');
            createToast("Please enter a valid link, or leave blank if you don't have one", {
                type: "warning",
                timeout: 5000
            });
            return;
        }

        setLoading(true);

        const res = await fetch('/api/tokens/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify({
                token: token.trim(),
                link: link.trim(),
            })
        }).catch(() => null);

        if(res?.status !== 200) {
            const json = await res?.json().catch(() => null);
            if(!json) {
                setLoading(false);
                const el = document.createElement('div');
                el.innerHTML = "An error occurred while submitting your token.<br/>If this keeps happening <a href='https://github.com/SammyWhamy/token-invalidator/issues/new'>open an issue on GitHub!<a/>";
                createToast(el, {
                    type: "error",
                    timeout: 5000
                });
                return;
            } else {
                setLoading(false);
                setToken('');
                createToast(json.error, {
                    type: "error",
                    timeout: 5000
                });
                return;
            }
        }

        setToken('');
        setLink('');
        setLoading(false);

        createToast("Token submitted successfully!", {
            type: "success",
            timeout: 5000
        });

        return;
    }

    return (
        <div>
            <form className="fixed items-center relative" onSubmit={TokenInvalidator}>
                <input
                    className="placeholder:text-grey-700 focus:border-purple-500 active:border-purple-500 w-full form-input px-4 py-3 rounded-t-3xl bg-white border border-white/30 focus:outline-none"
                    type='text'
                    placeholder={data ? "Enter the link where you found the token..." : "Please login with Discord first!"}
                    value={link}
                    onChange={i => setLink(i.target.value)}
                    disabled={!data}
                />
                <div className="w-full pr-[6.3rem] flex bg-white rounded-b-3xl active:border-purple-500 focus-within:border-purple-500 border border-white/30 focus:outline-none">
                    <input
                        className="flex-grow-[100] pr-1 placeholder:text-grey-700 form-input px-4 py-3 rounded-b-3xl focus:outline-none"
                        type='text'
                        placeholder={data ? "Enter the token to invalidate here..." : "Please login with Discord first!"}
                        maxLength={70}
                        minLength={20}
                        value={token}
                        onChange={i => setToken(i.target.value)}
                        disabled={!data}
                    />
                    <button
                        className='font-semibold rounded-full absolute right-0 px-5 py-3 mt-2 text-xs font-bold mr-2 text-white bg-bgDark focus:outline-none'
                        disabled={!data ? true : (loading)}
                    >
                        {loading ? "Invalidating..." : "Invalidate!"}
                    </button>
                </div>
            </form>
        </div>
    )
}
