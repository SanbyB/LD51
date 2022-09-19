import { ServiceLocator } from "../services/ServiceLocator";

export interface Entity {
    update: (serviceLocator: ServiceLocator) => void,
    onAddedToWorld: (serviceLocator: ServiceLocator) => void;
    onRemovedFromWorld: (serviceLocator: ServiceLocator) => void;
}
