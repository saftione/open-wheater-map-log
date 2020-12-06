export interface PedigreeModel {
  id: string;
  name: string;
  breeder: string;
  fertilization: string;
  fertilizationDate: Date,
  properties: String,
  queen:string;
  drone: string;
  description: String,
  published: Boolean
}
