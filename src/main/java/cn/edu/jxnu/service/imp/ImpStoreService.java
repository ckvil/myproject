package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.Store;
import cn.edu.jxnu.mapper.StoreMapper;
import cn.edu.jxnu.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * #Description ImpStoreService
 *
 * @author xh
 * #Date: 2023/3/31 11:57
 */

@Service
public class ImpStoreService implements StoreService {

    @Autowired
    StoreMapper storeMapper;

    @Override
    public Store myStore(Integer userId) {
        Store expectStore;
        List<Store> stores = storeMapper.findByUserId(userId);
        if (stores.size() == 0) {
            expectStore = null;
        } else {
            expectStore = stores.get(0);
        }
        return expectStore;
    }

    @Override
    public Store findStoreByStoreName(String storeName) {
        Store expectStore;
        List<Store> stores = storeMapper.findByStoreName(storeName);
        if (stores == null || stores.size() == 0) {
            expectStore = null;
        } else {
            expectStore = stores.get(0);
        }
        return expectStore;
    }

    @Override
    public int savaStore(Store store) {
        int i = storeMapper.insertStore(store);
        return i;
    }

    @Override
    public Store storeParticular(Integer storeId) {
        Store expectStore;
        List<Store> stores = storeMapper.findByStoreId(storeId);
        if (stores.size() == 0) {
            expectStore = null;
        } else {
            expectStore = stores.get(0);
        }
        return expectStore;
    }
}