import { Bomber } from "./engine/entities/Bomber";
import { Engineer } from "./engine/entities/Engineer";
import { Player } from "./engine/entities/Player";
import { Scientist } from "./engine/entities/Scientist";
import { Solider } from "./engine/entities/Soldier";
import { ServiceLocator } from "./services/ServiceLocator";
import { CanvasHelper } from "./util/CanvasHelper";
import { randomIntRange } from "./util/math/Random";

export class PlayerController{
    public scientist: Scientist;
    public soldier: Solider;    
    public engineer: Engineer;    
    public bomber: Bomber;
    public players: Player[];
    public state: Player;

    public constructor(serviceLocator: ServiceLocator) {
        this.scientist = new Scientist(serviceLocator, 10, 10);
        this.soldier = new Solider(serviceLocator, 50, 10);       
        this.engineer = new Engineer(serviceLocator, 10, 50);        
        this.bomber = new Bomber(serviceLocator, 50, 50);
        this.players = [this.scientist, this.soldier, this.engineer, this.bomber];
        this.state = this.players[randomIntRange(0, this.players.length)];
        setInterval(() => this.selectPlayer(), 10000);
    }

    private selectPlayer(){
        this.state = this.players[randomIntRange(0, this.players.length)];
        console.log(this.state);
    }

    public update(serviceLocator: ServiceLocator){
        const camera = CanvasHelper.getCamera();
        CanvasHelper.setCamera(this.state.x, this.state.y, camera.scale);
    }


}