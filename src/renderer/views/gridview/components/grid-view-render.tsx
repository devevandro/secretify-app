import ItemCard from "renderer/components/item-card";
import { ItemViewRenderProps } from "renderer/views/utils/types";
import { setIconUrl } from "shared/utils/utils";

import { GridViewCardContent } from "./grid-view-card-content";
import { GridViewSkeleton } from "./grid-view-skeleton";

export function GridViewRender(props: ItemViewRenderProps) {
  if (props.isFetching) {
    return <GridViewSkeleton />;
  }

  return (
    <GridViewCardContent>
      {props.items?.map((item) => (
        <ItemCard
          type={item.type}
          iconUrl={setIconUrl(item.plaintext.url || "")}
          key={item.id}
          id={item.id}
          name={item.plaintext.name}
          description={item.plaintext.description}
          onDelete={props.handleDeleteItem}
        />
      ))}
    </GridViewCardContent>
  );
}
