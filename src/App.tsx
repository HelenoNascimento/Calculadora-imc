import { useState } from 'react';
import styles from "./App.module.css";
import poweredImage from './assets/powered.png'; 
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/GridItem'

import { levels, calculateImc, Level} from './helpers/imc'


const App = () =>{
const [hightField, setHeightFild] = useState<number>(0);
const [wightField, setWeightFild] = useState<number>(0);

const [ toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () =>{
    if(hightField && wightField){
      setToShow(calculateImc(hightField, wightField));
    }else{
      alert("Digite todos os campos.");
    }
  }
  const handleBackButton = () =>{
    setToShow(null);
    setHeightFild(0);
    setWeightFild(0);
  }

  return(
    <div className={styles.main}>
      <header>
          <div className={styles.headerContainer}>
            <img src={poweredImage} alt="" width={150}/>
          </div>
      </header>
      <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule seu IMC.</h1>
            <p>
              IMC é a sigla para Índice de massa Corpóream parâmetro adotado 
              pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoal
            </p>
            <input 
              type="number" 
              placeholder="Digite a sua altura. Ex 1.5 (em métros)"
              value={hightField >0 ? hightField : ''}
              onChange={e => setHeightFild(parseFloat(e.target.value))}
              disabled={toShow? true: false}
            />
             <input 
              type="number" 
              placeholder="Digite o seu peso. Ex 75.3 (em kg)"
              value={wightField >0 ? wightField : ''}
              onChange={e => setWeightFild(parseFloat(e.target.value))}
              disabled={toShow? true: false}
            />
            <button onClick={handleCalculateButton}
             disabled={toShow? true: false}
            >Calcular</button>
          </div>
          <div className={styles.rightSide}>
            
              {!toShow &&
                 <div className={styles.grid}>
                  {levels.map((item, key) =>(
                   <GridItem key={key} item={item}/>
                 ))}
                </div>
              }
              {toShow && 
              <div className={styles.rightBig}>
                  <div className={styles.rightArrow} onClick={handleBackButton}>
                    <img src={leftArrowImage} alt="" width={25}/>
                  </div>
                  <GridItem item={toShow}/>
              </div>
              }
             
          </div>

      </div>
    </div>
  )
};

export default App;