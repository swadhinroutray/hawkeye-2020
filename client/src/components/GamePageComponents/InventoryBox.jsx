import React, { useEffect} from 'react';
import { inject, observer} from 'mobx-react';
import YellowCrystal from '../YellowCrystal';
import BlueCrystal from '../BlueCrystal';
import PurpleCrystal from '../PurpleCrystal';
import RedCrystal from '../RedCrystal';
import ShopIcon from '../../assets/ShopIcon.svg'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const InventoryBox = inject('gameplayStore')(
	
	observer(
		(
			
			{ gameplayStore,inventory,getinventory,match }) => 
			{
				
				useEffect(()=>{
					gameplayStore.getInventory()
				},[gameplayStore])
				return (inventory)? <div className="inventory"><div>

							
							{gameplayStore.itembool[parseInt(match.params.id)]&&(!gameplayStore.potionUsed) ? (gameplayStore.inventory)? <div className="inventory-items">
								
								{gameplayStore.inventory.some(obj=>obj.elixir==0)? <div className="inventory-item"><div className='crystal'><BlueCrystal/></div> <div className="inventory-item-content"><div> Extra hint</div><button onClick={()=>{getinventory(false);gameplayStore.getInventory();gameplayStore.useUnlockHint()}}>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==1) ? <div className="inventory-item"><div className='crystal'><YellowCrystal/></div><div className="inventory-item-content"><div> Region Multiplier</div><button onClick={()=>{getinventory(false);gameplayStore.getInventory();gameplayStore.useRegionMultiplier()
								}}>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==2) ?<div className="inventory-item"><div className='crystal'><PurpleCrystal/></div><div className="inventory-item-content"><div > Hangman</div><button onClick={()=>{getinventory(false);gameplayStore.getInventory();gameplayStore.useHangman()}}>USE</button></div></div>:null}
								{gameplayStore.inventory.some(obj=>obj.elixir==3) ?<div className="inventory-item"><div className='crystal'><RedCrystal/></div><div className="inventory-item-content"><div > Skip Question</div><button onClick={()=>{getinventory(false);gameplayStore.getInventory(); gameplayStore.useSkipQuestion()}}>USE</button></div></div>:null}
								</div>: <div>no potions</div>:<div style={{textAlign:"center",marginLeft:"1rem"}}>potion already used</div>	}</div>
								<div id="inventory-right">
								<div className="close" onClick={()=>{getinventory(false)}}><i className="btn-close" >
				<FontAwesomeIcon icon={faTimes} />
			</i>
</div>
								<a href="/shop"><img id="shop-button" src={ShopIcon} alt="shop"/></a>
								
</div>
								</div>:null
								}

								
		)
)
	
