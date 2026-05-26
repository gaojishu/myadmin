import { store } from "@/store";
import { enumsStateUpdate } from "@/store/reducers/EnumsSlice";
import { EnumsData } from "@/types";

export function setEnumsState(enumsRecord: EnumsData) {
    store.dispatch(enumsStateUpdate(enumsRecord));
}