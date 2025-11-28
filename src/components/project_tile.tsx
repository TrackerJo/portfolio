import "./project_tile.css";

type ProjectTileProps = {
    name: string;
    subtitle: string;
    icon: string;
    onClick: () => void;
};


const ProjectTile = ({ name, subtitle, icon, onClick }: ProjectTileProps) => {
    return (<div className="project-tile" onClick={onClick}>
        <div className="project-icon-container">
            <div className={`project-icon`}>
                <img src={icon} alt={`${name}'s icon`} />
            </div>
        </div>
        <br />
        <h4 className='project-name'>{name}</h4>
        <p className='project-subtitle'>{subtitle}</p>
    </div>)
}

export default ProjectTile;