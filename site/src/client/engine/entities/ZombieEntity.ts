import { CHARACTER_ATTACK_DISTANCE } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { CharacterEntity } from "./CharacterEntity";
import { Player } from "./Player";


const ZOMBIE_WIDTH = 30;
const ZOMBIE_HEIGHT = 30;
const ZOMBIE_SPEED = 0.1;

export class Zombie extends CharacterEntity {

    private walking_right = true;
    
    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y, "zombie", ZOMBIE_WIDTH, ZOMBIE_HEIGHT, "test_tube");
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);

        this.xVel += this.walking_right ? ZOMBIE_SPEED : -ZOMBIE_SPEED;

        this.tryAttackPlayer(serviceLocator);
    }

    private tryAttackPlayer(serviceLocator: ServiceLocator) {
        let closestPlayer: Player = undefined;
        let closestPlayerDistance = -1;
        for (let entity of serviceLocator.getWorld().getEntityArray()) {
            if (entity instanceof Player) {
                const playerEntity = entity as Player;
                const dis = this.distanceTo(playerEntity);
                if (closestPlayer == undefined || dis < closestPlayerDistance) {
                    closestPlayer = playerEntity;
                    closestPlayerDistance = dis;
                }
            }
        }

        if (!closestPlayer) return;

        const angleTo = this.angleTo(closestPlayer);
        this.setHand(this.angleTo(closestPlayer));

        if (closestPlayerDistance < CHARACTER_ATTACK_DISTANCE) {
            this.doAttack(angleTo);
        }
    }   

    public onAddedToWorld(serviceLocator: ServiceLocator) {
        setInterval(() => {
            this.walking_right = !this.walking_right;
            this.setHand(this.walking_right ? 90 : -90)
        }, 2000);

    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
    }
}
