export default function SigninLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center h-screen">
            {children}
        </section>
    );
}
