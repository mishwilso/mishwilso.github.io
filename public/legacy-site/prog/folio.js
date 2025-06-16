class FolioProgram extends Program {
    


    createWindow() {
        let wminfo = {
            name: 'Portfolio - Work',
            title: 'Portfolio - Work',
            icon:  'img/desktop/MyDocuments.png',
            hasMenuBar: true,
            y: 40,
            x: isMobileBrowser() ? 20 : 120,
            width: 300,
            height:300,
            resizable: true
        }
    
        let body = `
            <div class="typography">
                <div class="win-container">
                    <canvas id="selections"></canvas>
                    <div class="win">
                        <div class="desktop-icon" data-launch="welcome">
                            <img src="img/desktop/MyComputer.png" alt="My Computer">
                            <span>My Computer</span>
                        </div>
                        <!-- more icons -->
                    </div>
                </div>
            </div>            
        `;
    
        setTimeout(() => {
            document.querySelectorAll('.win .desktop-icon').forEach(icon => {
                window.dm.attachIconSelection(icon); // Attach click and double-click events
                //window.dm.attachIconMovement(icon);  // Attach drag functionality
            });
        }, 100); // Adding a slight delay to ensure icons are in DOM
    
        return [wminfo, body];
    }
    

    createResearchWindow() {
        let wminfo = {
            name: 'Portfolio - Research',
            title: 'Portfolio - Research Projects',
            icon:  'img/desktop/MyDocuments.png',
            y: 80,
            x: isMobileBrowser() ? 60 : 200
        }

        let body = `
            <div class="typography">
                <h2> Portfolio / Research </h2>
                <subtitle> Here are some of the research projects I've been involved in.</subtitle>
                
                <hr class="hr--accent2"/>

                <br/>
                <b> Class Introspection: A Novel Technique for Detecting Unlabeled Subclasses by Leveraging Classifier Explainability Methods </b><br/><span>Patrick Kage, Dr. Pavlos Andreadis (2021)</span>
                <p>
                <details>
                    <summary>Abstract</summary>
                    <div class="typography--normaltext">
                    Detecting latent structure within a dataset is a crucial step in performing
                    analysis of a dataset. However, existing state-of-the-art techniques for
                    subclass discovery are limited: either they are limited to detecting very
                    small numbers of outliers or they lack the statistical power to deal with
                    complex data such as image or audio. This paper proposes a solution to this
                    subclass discovery problem: by leveraging instance explanation methods, an
                    existing classifier can be extended to detect latent classes via
                    differences in the classifier's internal decisions about each instance.
                    This works not only with simple classification techniques but also with
                    deep neural networks, allowing for a powerful and flexible approach to
                    detecting latent structure within datasets. Effectively, this represents a
                    projection of the dataset into the classifier's "explanation space," and
                    preliminary results show that this technique outperforms the baseline for
                    the detection of latent classes even with limited processing.  This paper
                    also contains a pipeline for analyzing classifiers automatically, and a web
                    application for interactively exploring the results from this technique.
                    </div>
                </details>
                </p>
                <p>
                    <a href="https://arxiv.org/abs/2107.01657" target="_blank">Read the full paper on arXiv</a>. This is an
                    adaptation for publication of my honours project paper, which can be found
                    <a href="https://misc.ka.ge/honours.pdf" target="_blank">here</a>. Watch me talk about it at the
                    Knowledge Representation for Hybrid and Compositional
                    Artificial Intelligence workshop <a href="https://www.youtube.com/watch?v=i2gULufLnf8">here</a> (at KR 2021: 18th
                    International Conference on Principles of Knowledge
                    Representation and Reasoning).
                </p>

                <br/>
                <b> Research Interests </b><br/>
                <p>
                    Research topics I am interested in pursuing:
                </p>
                <ul>
                    <li>AI Explainability</li>
                    <li>AI Active Learning</li>
                    <li>Deep Learning</li>
                    <li>Latent Structure Detection</li>
                    <li>Human Computer Interaction</li>
                    <li>Computer Vision</li>
                </ul>
            </div>
        `

        return [wminfo, body]
    }
}

window.pm.registerPrototype('folio', FolioProgram)
