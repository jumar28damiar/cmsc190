export class dataLink {
    descriptionText : string;
    actLink : string;
    actLabel: string;
    img: string;
    name:string;
    public button:boolean;
    constructor(name, desc, link, actl, img, button) {
        this.descriptionText = desc;
        this.actLink = link;
        this.actLabel = actl;
        this.img = img;
        this.name = name;
        this.button = button;
    }
}
