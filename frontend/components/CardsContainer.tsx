import FeilCard from "./FeilCard";


/**
 * 
 * @returns Komponent for returnering av konteiner med alle feilinnmeldingene. 
 */
const CardsContainer = () => {
    return(
        <div>
            <div className="bg-red-500 grid grid-cols-2 gap-4">
                <FeilCard />  
                <FeilCard />  
                <FeilCard />  
                <FeilCard />  
            </div>
            <div className="bg-blue-500 flex flex-row flex-wrap gap-4">
                <FeilCard />  
                <FeilCard />  
                <FeilCard />  
                <FeilCard />  
            </div>        
        </div>

    )
}
export default CardsContainer