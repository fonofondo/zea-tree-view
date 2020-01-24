import { Component, h, Prop, State, Element, Watch } from "@stencil/core";

@Component({
  tag: "zea-tree-item-element",
  styleUrl: "tree-item-element.css",
  shadow: true
})
export class TreeItemElement {
  @Element() _element: HTMLElement;

  @Prop() arrow: string = "►";
  @Prop() label: string = "Loading...";
  @Prop() expandOnLoad: boolean = false;
  @Prop() treeItem: any;
  @Prop() isRoot: boolean = false;
  @State() showChildren: boolean = true;
  @State() hasChildren: boolean = false;

  childAddedId: any;
  nameChangedId: BigInteger;

  @Watch("treeItem")
  treeItemChanged(treeItem: any) {
    console.log("TreeItem changed:", treeItem);
    this.label = treeItem.getName();
  }

  private toggleChildren() {
    if (this.showChildren) {
      this.showChildren = false;
    } else {
      this.showChildren = true;
    }
  }

  childAdded(treeItem) {
    const child = document.createElement("zea-tree-item-element");
    child.treeItem = treeItem;

    this._element.shadowRoot
      .querySelector(".zea-tree-item-children")
      .appendChild(child);

    this.hasChildren = true;
  }

  nameChanged() {
    this.label = this.treeItem.getName();
  }

  componentDidLoad() {
    this.childAddedId = this.treeItem.childAdded.connect(
      this.childAdded.bind(this)
    );

    this.nameChangedId = this.treeItem.nameChanged.connect(
      this.nameChanged.bind(this)
    );

    this.nameChanged();

    this.treeItem.getChildren().forEach(srcChildItem => {
      this.childAdded(srcChildItem);
    });
  }

  render() {
    return (
      <div class="zea-tree-item-wrap">
        <div class="zea-tree-item-header">
          <div
            class="zea-tree-item-arrow"
            onClick={() => this.toggleChildren()}
            style={{
              display: this.hasChildren ? "block" : "none"
            }}
          >
            <span>{this.arrow}</span>
          </div>
          <div class="zea-tree-item-toggle">
            <ion-icon name="eye"></ion-icon>
          </div>
          <div class="zea-tree-item-label">{this.label}</div>
        </div>
        <div
          class="zea-tree-item-children"
          style={{
            display: this.showChildren ? "block" : "none"
          }}
        ></div>
      </div>
    );
  }
}
