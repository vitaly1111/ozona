import { asd } from './modules/func'
import { enableScroll,disableScroll,handlerModal } from '../blocks/popup/popup'
import { cart } from './modules/cart';
import { load } from './modules/load'
import { search } from './modules/searchData';
import catalog from './modules/catalog';
import { filter } from './modules/filter';


cart();

load();
search();
catalog();
filter();