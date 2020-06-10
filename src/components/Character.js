import React, { useState, useEffect } from 'react';
import { setCharacterStats } from '../actions';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const Character = ({ log }) => {
    const [statPoints, setStatPoints] = useState(30)
    const [gender, setGender] = useState('Male')
    const [constitution, setConstitution] = useState(0)
    const [attack, setAttack] = useState(0)
    const [defense, setDefense] = useState(0)
    const [dexterity, setDexterity] = useState(0)
    const [intelligence, setIntelligence] = useState(0)
    const [speed, setSpeed] = useState(0)

    const dispatch = useDispatch()

    const controlStatsIncrease = (stat) => {
        // stat is the stat that will be controlled
        switch (stat) {
            case 'constitution':
                setConstitution(constitution + 1)
                setStatPoints(statPoints - 1)
                break;
            case 'attack':
                setAttack(attack + 1)
                setStatPoints(statPoints - 1)
                break;
            case 'defense':
                setDefense(defense + 1)
                setStatPoints(statPoints - 1)
                break;
            case 'dexterity':
                setDexterity(dexterity + 1)
                setStatPoints(statPoints - 1)
                break;
            case 'intelligence':
                setIntelligence(intelligence + 1)
                setStatPoints(statPoints - 1)
                break;
            case 'speed':
                setSpeed(speed + 1)
                setStatPoints(statPoints - 1)
                break;
            default:
                console.log('None matches, Check it again.')
        }

    }

    const controlStatsDecrease = (stat) => {
        // stat is the stat that will be controlled

        switch (stat) {
            case 'constitution':
                setConstitution(constitution - 1)
                setStatPoints(statPoints + 1)
                break;
            case 'attack':
                setAttack(attack - 1)
                setStatPoints(statPoints + 1)
                break;
            case 'defense':
                setDefense(defense - 1)
                setStatPoints(statPoints + 1)
                break;
            case 'dexterity':
                setDexterity(dexterity - 1)
                setStatPoints(statPoints + 1)
                break;
            case 'intelligence':
                setIntelligence(intelligence - 1)
                setStatPoints(statPoints + 1)
                break;
            case 'speed':
                setSpeed(speed - 1)
                setStatPoints(statPoints + 1)
                break;
            default:
                console.log('None matches, Check it again.')
        }
    }

    const changeGender = () => {
        if(gender === 'Male') {
            setGender('Female')
        } else {
            setGender('Male')
        }
    }

    const resetPoints = () => {
        setAttack(0)
        setConstitution(0)
        setDefense(0)
        setDexterity(0)
        setIntelligence(0)
        setSpeed(0)
        setStatPoints(30)
    }

    const confirmStats = () => {
        let stats = {
            'gender': gender,
            'level': 1,
            'constitution': constitution+1,
            'attack': attack+1,
            'defense': defense+1,
            'dexterity': dexterity+1,
            'intelligence': intelligence+1,
            'speed': speed+1
        }

        console.log('stats', stats)
        dispatch(setCharacterStats(stats))
    }

    useEffect(() => {
        console.log("This is the character creation component.")
    }, [log])

    return (
        <div>
            <h1>This is the character creation page.</h1>
            <div className='stats'>
                <div>
                    <p>Gender: {gender}</p>
                    <button onClick={() => changeGender()}>Change Gender</button>
                </div>

                <div>
                    <p>Remaining Stat Points: {statPoints}</p>
                </div>

                <div>
                    <button disabled={constitution > 0 ? false : true} onClick={() => controlStatsDecrease('constitution')}>-</button>
                    <button disabled={statPoints > 0 ? false : true} onClick={() => controlStatsIncrease('constitution')}>+</button>

                    {/* {constitution > 0 && <button onClick={() => controlStatsDecrease('constitution')} >-</button>}
                    {statPoints > 0 && <button onClick={() => controlStatsIncrease('constitution')}>+</button>} */}
                    <span>Constitution: {constitution} : Determines how much Health you have.</span>
                </div>

                <div>
                    <button disabled={attack > 0 ? false : true} onClick={() => controlStatsDecrease('attack')}>-</button>
                    <button disabled={statPoints > 0 ? false : true} onClick={() => controlStatsIncrease('attack')}>+</button>

                    {/* {attack > 0 && <button onClick={() => controlStatsDecrease('attack')}>-</button>}
                    {statPoints > 0 && <button onClick={() => controlStatsIncrease('attack')}>+</button>} */}
                    <span>Attack: {attack} : Determines how much damage your physical attacks and abilities do.</span>
                </div>

                <div>
                    <button disabled={defense > 0 ? false : true} onClick={() => controlStatsDecrease('defense')}>-</button>
                    <button disabled={statPoints > 0 ? false : true} onClick={() => controlStatsIncrease('defense')}>+</button>

                    {/* {defense > 0 && <button onClick={() => controlStatsDecrease('defense')}>-</button>}
                    {statPoints > 0 && <button onClick={() => controlStatsIncrease('defense')}>+</button>} */}
                    <span>Defense: {defense} : Determines how much damage you take.</span>

                </div>

                <div>
                    <button disabled={dexterity > 0 ? false : true} onClick={() => controlStatsDecrease('dexterity')}>-</button>
                    <button disabled={statPoints > 0 ? false : true} onClick={() => controlStatsIncrease('dexterity')}>+</button>

                    {/* {dexterity > 0 && <button onClick={() => controlStatsDecrease('dexterity')}>-</button>}
                    {statPoints > 0 && <button onClick={() => controlStatsIncrease('dexterity')}>+</button>} */}
                    <span>Dexterity: {dexterity} : Determines your dodge chance and attack of specific abilities.</span>

                </div>

                <div>
                    <button disabled={intelligence > 0 ? false : true} onClick={() => controlStatsDecrease('intelligence')}>-</button>
                    <button disabled={statPoints > 0 ? false : true} onClick={() => controlStatsIncrease('intelligence')}>+</button>

                    {/* {intelligence > 0 && <button onClick={() => controlStatsDecrease('intelligence')}>-</button>}
                    {statPoints > 0 && <button onClick={() => controlStatsIncrease('intelligence')}>+</button>} */}
                    <span>Intelligence: {intelligence} : Determines the damage you deal using magic abilities.</span>

                </div>

                <div>
                    <button disabled={speed > 0 ? false : true} onClick={() => controlStatsDecrease('speed')}>-</button>
                    <button disabled={statPoints > 0 ? false : true} onClick={() => controlStatsIncrease('speed')}>+</button>

                    {/* {speed > 0 && <button onClick={() => controlStatsDecrease('speed')}>-</button>}
                    {statPoints > 0 && <button onClick={() => controlStatsIncrease('speed')}>+</button>} */}
                    <span>Speed: {speed} : Determines your turn order and amount of times you get a turn.</span>
                </div>


                <button disabled={statPoints < 30 ? false : true} onClick={() => resetPoints()}>RESET</button>
                <button disabled={statPoints === 0 ? false : true} onClick={() => confirmStats()}>CONFIRM</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    log: state.game.log,
});

export default connect(mapStateToProps, { setCharacterStats })(Character);