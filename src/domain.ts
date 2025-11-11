// logic related to domain entities
interface IBaseEntity {
    createdAt: Date;
    updatedAt: Date;
    id: string;
}

interface ITask extends IBaseEntity {
    title: string;
    completed: boolean;
}

// ui related entities
interface IBaseElement {
    className?: string;
    innerText?: string;
    id?: string;
}