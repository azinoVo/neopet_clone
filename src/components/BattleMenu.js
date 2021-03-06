import React, { useState } from 'react';
import { setEncounterInfo, userBattleAction, encounterBattleAction, reward } from '../actions';
import Popup from "reactjs-popup";
import { useDispatch } from 'react-redux';
import { Progress } from 'react-sweet-progress';
import { connect } from 'react-redux';
import BattleLog from './GameLog';

const BattleMenu = ({ encountersList, userBattleStats, currentEncounter, userAbilities, userBase, resetPlot, index }) => {
    const [inBattle, setInBattle] = useState(false)

    const dispatch = useDispatch()


    const randomEncounter = () => {
        //  Random number used to set the currentEncounter in store to be the index of the encounter array
        let randomNumber = Math.floor((Math.random() * encountersList.length));

        dispatch(setEncounterInfo(encountersList[randomNumber]))
        setInBattle(!inBattle)
    }

    const collectReward = (difficulty) => {
        // Takes in a difficulty from the encounter info and sends that difficulty to actions

        dispatch(reward(difficulty))

        // Reset battle status and reset the Forest space at particular index
        setInBattle(!inBattle)
        resetPlot(index)
    }

    const battle = (userStats, encounterStats, ability) => {
        let encounterDodgeNumber = Math.floor((Math.random() * 100) + 1)
        let userDodgeNumber = Math.floor((Math.random() * 100) + 1)
        let encounterSkillNumber = Math.floor((Math.random() * encounterStats.abilities.length))

        // If the dodge number is equal or less than the dodge rate of encounter, it means encounter dodged user the auto attack
        // If not dodged, then dispatch the ability of user

        if (encounterDodgeNumber <= encounterStats.stats.dodge * 100
            && ability === 'Auto-Attack'
        ) {
            dispatch(userBattleAction(userStats, encounterStats, 'Encounter-Dodged'))
        } else {
            dispatch(userBattleAction(userStats, encounterStats, ability))
        }

        // If the dodge number is equal or less than the dodge rate of user, it means user dodged encounter auto attack
        // If not dodged, then dispatch the ability of encounter using the encounterSkillNumber

        if (userDodgeNumber <= userStats.dodge * 100
            && encounterStats.abilities[encounterSkillNumber] === 'Auto-Attack'
            && ability !== 'Charge'
            && currentEncounter.stats.health > 0
        ) {
            dispatch(encounterBattleAction(userStats, encounterStats, 'User-Dodged'))
        } else {
            dispatch(encounterBattleAction(userStats, encounterStats, encounterStats.abilities[encounterSkillNumber]))
        }

    }

    return (
        <Popup trigger={<button className="button">Inspect the Shadow</button>} modal>

        { close => <div className='battle-popup'>
            <h1>This is the battle menu.</h1>
            {/* This button will randomize a number and pick a 
            creature from within the encounter array to send to currentEncounter within reducer. */}
            <button onClick={() => randomEncounter()}>Spawn a Random Enemy</button>

            {inBattle && <div className='battle-container'>
                {currentEncounter.stats.health === 0 && <button onClick={() => collectReward(currentEncounter.difficulty)}>Collect Reward</button>}

                {currentEncounter.stats.health > 0 && <div className='enemy'>
                    {/* This information will be displayed from currentEncounters within reducer */}
                    <h2>Enemy Menu</h2>
                    {currentEncounter ? <p>{currentEncounter.name}</p> : 'No Encounters'}
                    <p>Picture Here or Animation</p>
                    <Progress
                        percent={Math.ceil([currentEncounter.stats.health/encountersList[currentEncounter.id].stats.health]*100)}
                    />
                    {currentEncounter && <p>Health: {currentEncounter.stats['health']}</p>}
                </div>}

                {currentEncounter.stats.health > 0 && <div className='user'>
                    <h2>User Menu</h2>
                    <p>Health: {userBattleStats.health}</p>
                    <Progress
                        percent={Math.ceil(userBattleStats.health/[Math.ceil(userBase.constitution*5)]*100)}
                    />
                    <p>Attack Power: {userBattleStats.attackPower}</p>
                    <p>Magic Power: {userBattleStats.magicPower}</p>
                    <p>Ultimate Points: {userBattleStats.ultimate}</p>
                    <Progress
                        percent={[userBattleStats.ultimate/10]*100}
                    />
                    {
                        userAbilities.map(ability => {
                            return <button
                                className='ability-button'
                                disabled={((ability.name.includes('Ultimate') && userBattleStats.ultimate === 0) || userBattleStats.health === 0) ? true : false} onClick={() =>
                                    battle(userBattleStats, currentEncounter, ability.name)} key={ability.name}>{ability.name}: {ability.description}</button>
                        })
                    }
                </div>}

                {currentEncounter.stats.health > 0 && <div className='battle-log'>
                    <h2>Battle Log</h2>
                    <BattleLog />
                </div>}

                <div className="actions">
                        <button className="button" onClick={() => { close(); resetPlot(index); }}>Run </button>
                    </div>

            </div>}
        </div>}
        </Popup>
    );
}

const mapStateToProps = state => ({
    encountersList: state.game.encounters,
    currentEncounter: state.game.currentEncounter,
    userBattleStats: state.user.battleStats,
    userAbilities: state.user.abilities,
    userBase: state.user.stats
});

export default connect(mapStateToProps, { userBattleAction, setEncounterInfo })(BattleMenu);