import UserDataForm from "./components/UserDataForm.tsx";

function App() {
    return (
        <main className="container">
            <article>
                <UserDataForm onSubmit={() => console.log('Submit')}/>
            </article>
        </main>
    )
}

export default App
