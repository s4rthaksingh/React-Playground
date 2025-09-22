import { LevelContext } from "./LevelContext"

export default function Section({ children }){
    return (
        <section className="section">
            <LevelContext value={level}>
                {children}
            </LevelContext>
        </section>
    )
}