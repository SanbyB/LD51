import { CHARACTER_ATTACK_DISTANCE, ZOMBIE_ATTACK_DISTANCE } from "../../Config";
import { ServiceLocator } from "../../services/ServiceLocator";
import { CanvasHelper } from "../../util/CanvasHelper";
import { randomIntRange } from "../../util/math";
import { World } from "../World";
import { CharacterEntity } from "./CharacterEntity";
import { Player } from "./Player";


const ZOMBIE_SPEED = 0.08;
const ZOMBIE_ATTACK_STRENGTH = 0.4;
const ZOMBIE_SIZE_VARIATION = 10;

export class Zombie extends CharacterEntity {

    static zombieNumber = 0;

    public constructor(serviceLocator: ServiceLocator, x: number, y: number) {
        super(serviceLocator, x, y, "zombie", 
            30 + randomIntRange(0, ZOMBIE_SIZE_VARIATION), 
            30 + randomIntRange(0, ZOMBIE_SIZE_VARIATION), 
            "zombie_hand");
        this.damage = ZOMBIE_ATTACK_STRENGTH;
        
    }

    public update(serviceLocator: ServiceLocator) {
        super.update(serviceLocator);
        this.tryMoveToPlayer(serviceLocator);
        this.tryAttackPlayer(serviceLocator);
    }

    private tryMoveToPlayer(serviceLocator: ServiceLocator) {
        const closestPlayer = this.getClostestPlayer(serviceLocator);
        if (!closestPlayer) return;
        const angle = this.getDirectionToTravelTo(closestPlayer);
        const rads = (angle / 180) * Math.PI;
        this.xVel += Math.sin(rads) * ZOMBIE_SPEED;
        this.yVel += -Math.cos(rads) * ZOMBIE_SPEED;
    }

    private tryAttackPlayer(serviceLocator: ServiceLocator) {
        let closestPlayer: Player = this.getClostestPlayer(serviceLocator);
        if (!closestPlayer) return;
        const closestPlayerDistance = this.distanceTo(closestPlayer);
        const angleTo = this.angleTo(closestPlayer);
        this.setHand(this.angleTo(closestPlayer));

        if (closestPlayerDistance < ZOMBIE_ATTACK_DISTANCE) {
            this.doAttack(angleTo);
        }
    }   

    private getClostestPlayer(serviceLocator: ServiceLocator): Player {
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
        return closestPlayer;
    }

    public onAddedToWorld(serviceLocator: ServiceLocator) {
        Zombie.zombieNumber += 1;

    }
    public onRemovedFromWorld(serviceLocator: ServiceLocator) {
        Zombie.zombieNumber -= 1;
    }

    public getDirectionToTravelTo(otherEntity: CharacterEntity): number {
        return this.angleTo(otherEntity);
    }

}
