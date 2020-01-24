import { Component, Host, h, Prop, Element, Watch, State } from "@stencil/core";

@Component({
  tag: "zea-tree-view",
  styleUrl: "tree-view.css",
  shadow: true
})
export class TreeView {
  @Element() _element: HTMLElement;

  @Prop() rootItem: any;

  @State() rootItemElement: any;

  @Watch("rootItem")
  onRootChanged(rootItem: any) {
    console.log("Root item changed:", rootItem);
  }

  componentDidLoad() {
    this.rootItemElement = document.createElement("zea-tree-item-element");

    const treeViewContainer = this._element.shadowRoot.querySelector(
      ".zea-tree-view-wrap"
    );

    this.rootItemElement.treeItem = this.rootItem;
    this.rootItemElement.isRoot = true;
    this.rootItemElement.expandOnLoad = true;
    this.rootItemElement.label = this.rootItem.getName();

    treeViewContainer.appendChild(this.rootItemElement);
  }

  render() {
    return (
      <Host>
        <div class="zea-tree-view-wrap" id="zea-tree-view-container"></div>
      </Host>
    );
  }
}
