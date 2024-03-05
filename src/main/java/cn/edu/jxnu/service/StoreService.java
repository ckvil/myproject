package cn.edu.jxnu.service;

import cn.edu.jxnu.domain.Store;

public interface StoreService {

    public Store myStore(Integer userId);

    public Store findStoreByStoreName(String storeName);

    public int savaStore(Store store);

    public Store storeParticular(Integer storeId);
}
