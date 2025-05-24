import ItemCard from "renderer/components/item-card";
import { NoItem } from "renderer/components/no-item";
import { ItemViewRenderProps } from "renderer/views/utils/types";
import { setIconUrl } from "shared/utils/utils";

import { ListViewCardContent } from "./list-view-card-content";
import { ListViewSkeleton } from "./list-view-skeleton";

export function ListViewRender(props: ItemViewRenderProps) {
  if (props.isFetching) {
    return <ListViewSkeleton />;
  }

  if (props.items?.length === 0 && props.isFetching) {
    return (
      <NoItem
        title="Nenhum Item Criado!"
        subtitle="Bora começar a criar um item?"
        isGridView={false}
      />
    );
  }

  return (
    <ListViewCardContent>
      {props.items?.map((item) => (
        <ItemCard
          type={item.type}
          key={item.id}
          id={item.id}
          iconUrl={setIconUrl(item.plaintext.url || "")}
          name={item.plaintext.name}
          description={item.plaintext.description}
          listView={true}
          onDelete={props.handleDeleteItem}
          onClick={() => props.handleCardClick(item)}
        />
      ))}
    </ListViewCardContent>
  );
}
