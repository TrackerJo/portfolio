import './upgrade.css';
import Cookie from '../assets/cookie.png';

export type UpgradeType = {
    name: string;
    price: number;
    cps: number;
    backgroundPosition: [number, number];
    count: number; // Optional count for upgrades that can be purchased multiple times
};

function Upgrade({ onUpgrade, canUpgrade, upgrade }: { onUpgrade: () => void, canUpgrade: boolean, upgrade: UpgradeType }) {
    function stylePrice(): string {
        let styledPrice = "";
        const price = upgrade.price;
        const priceArray = price.toString().split('');
        priceArray.reverse();
        const priceString = priceArray.join('');
        for (let i = 0; i < priceString.length; i++) {
            const element = priceString[i];
            if ((styledPrice.length + 1) % 4 == 0) {
                styledPrice += ","
            }
            styledPrice += element;
            console.log(element)
            console.log(styledPrice.length)
            console.log(styledPrice.length % 3)



        }
        const styledPriceArray = styledPrice.split('');
        styledPriceArray.reverse();
        return styledPriceArray.join('');
    }

    return (
        <div className={`upgrade-container ${canUpgrade ? 'can-upgrade' : 'cannot-upgrade'}`} onClick={onUpgrade}>
            <div className='upgrade-content'>
                <div className="upgrade-icon" style={{ backgroundPosition: `${upgrade.backgroundPosition[0]}px ${upgrade.backgroundPosition[1]}px` }}>

                </div>
                <div className="upgrade-text">
                    <h3 className="upgrade-title">{upgrade.name}</h3>
                    <div className='upgrade-price'>
                        <img src={Cookie} alt="" className='price-cookie' />
                        <span className="price-text">{stylePrice()}</span>


                    </div>
                </div>
            </div>

            <div className="upgrade-count">
                {upgrade.count > 0 && <span className="count-text">{upgrade.count}</span>}
            </div>
        </div>
    );
}

export default Upgrade;