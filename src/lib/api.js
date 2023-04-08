export const sendResetPasswordEmail = async (data) => {
    const res = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
    });
    return res;
}