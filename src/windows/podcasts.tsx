import { podcasts } from '../constants';
import './podcasts.css';






const PodcastWindow = () => {


   

    return (
        <>


            <div className="section-title">:: Podcasts</div>
            <div className="podcasts-grid">
                {podcasts.map((pod, index) => (
                    <div key={index} className="podcast-category" onClick={() => {
                        window.open(pod.url, '_blank');
                    }}>
                        <div className="podcast-picture-div">
                            <div className={`podcast-picture`}>
                                <img src={pod.image} alt={`${pod.title}'s logo`} />
                            </div>
                        </div>
                        <br />
                        <h3 className='exp-position'>{pod.title}</h3>

                        <p className='exp-description'>{pod.authors.join(', ')}</p>
                    </div>
                ))}
            </div>
            
        </>
    )
}

export default PodcastWindow;