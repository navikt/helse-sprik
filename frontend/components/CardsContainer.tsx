import FeilCard from "./FeilCard";


/**
 * 
 * @returns Komponent for returnering av konteiner med alle feilinnmeldingene. 
 */
const CardsContainer = () => {
    return(
        <div>
            <div className="grid grid-cols-2 gap-4">
                <FeilCard tittel="Mangel på hensyn til tariffoppgjør" beskrivelse="Det har vært ett tariffoppgjør og speil sier sykepengene må tilbakekreves, noe som er feil. (sier vi.. har ikke domenekunnskap)"/>  
                <FeilCard tittel="Speil sier NAV må tilbakekreve sykepenger på feil grunnlag" beskrivelse="baluba"/>  
                <FeilCard tittel="Feil A" beskrivelse="Dette er Feil fordi x, y, z"/>  
                <FeilCard tittel="Feil B" beskrivelse="Lorem Ipsum"/>  
            </div>     
        </div>

    )
}
export default CardsContainer