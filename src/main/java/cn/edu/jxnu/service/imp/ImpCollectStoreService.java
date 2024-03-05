package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.CollectStore;
import cn.edu.jxnu.mapper.CollectStoreMapper;
import cn.edu.jxnu.service.CollectStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * #Description ImpCollectStoreService
 *
 * @author xh
 * #Date: 2023/4/7 18:00
 */

@Service
public class ImpCollectStoreService implements CollectStoreService {

    @Autowired
    CollectStoreMapper collectStoreMapper;

    @Override
    public CollectStore findCollectStore(CollectStore collectStore) {
        CollectStore expectCollectStore;
        List<CollectStore> collectStores = collectStoreMapper.findCollectStore(collectStore);
        if (collectStores == null || collectStores.size() == 0) {
            expectCollectStore = null;
        } else {
            expectCollectStore = collectStores.get(0);
        }
        return expectCollectStore;
    }
}