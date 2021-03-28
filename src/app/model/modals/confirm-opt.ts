export class ConfirmOpt {
  constructor (
    public title: string,
    public subtitle: string,
    public description: string,
    public confirmFunction: () => void,
    public cancelFunction: () => void = () => {}) {

    }
  
}
