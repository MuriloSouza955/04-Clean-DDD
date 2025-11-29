import { UniqueEntityId } from "./unique-entity-id";

export class Entity <Props>{
  private _id: UniqueEntityId;
  protected props: Props;

  get id(): string {
    return this._id.toValue();
  }

  constructor (props: Props, id?: string){
    this.props = props;
    this._id = new UniqueEntityId(id);
   }
}