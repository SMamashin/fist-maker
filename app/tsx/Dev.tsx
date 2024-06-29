import './styles.scss';
import linksData from './links.json';

const FistMakerDevelopment =
    <>
        <h2>Разработка</h2>
        <div className="container">
            <p>В ходе разработки использовано следующее:</p>
            <div className="img-container">
                {linksData.developmentTechnologies.map((tech, index) => {
                    const imageClassName = tech.style ? tech.style: `${tech.name.toLowerCase().replace(/[^a-z]/g, '-')}-logo`;
                    return tech.url ? (
                        <a key={index} href={tech.url} title={tech.name} target="_blank">
                            <img className={imageClassName} src={tech.src} alt={tech.name}/>
                        </a>
                    ) : (
                        <img key={index} className={imageClassName} src={tech.src} alt={tech.name}/>
                    );
                })}
            </div>
            <p>В качестве инструментов используется:</p>
            <div className="img-container">
                {linksData.developmentTools.map((tool, index) => {
                    const imageClassName = tool.style ? `${tool.style}` : `${tool.name.toLowerCase().replace(/[^a-z]/g, '-')}-logo`;
                    return tool.url ? (
                        <a key={index} href={tool.url} title={tool.name} target="_blank">
                            <img className={imageClassName} src={tool.src} alt={tool.name}/>
                        </a>
                    ) : (
                        <img key={index} className={imageClassName} src={tool.src} alt={tool.name}/>
                    );
                })}
            </div>
            <br/>
            <br/>
            <p>
                Ядро приложения и ботов написано на TypeScript. При написании приложения использовался React для
                реализации
                самого приложения, SCSS для разработки UI, в качестве сборщика использовался Vite. <br/> <br/>
                VSCode - используется для поддержки разработки ботов. <br/>
                WebShtorm - выступает главным IDE в разработке веб-приложения. <br/>
                Photoshop - с его помощью создается оформление проекта. <br/>
                Neverlane - качественный код-ревью на этапах разработки. <br/>
            </p>
            <p className="info-later">Информация обновлена: 08.06.2024</p>
        </div>
    </>


export default FistMakerDevelopment