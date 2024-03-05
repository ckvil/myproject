package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.Collect;
import cn.edu.jxnu.domain.CollectMerchandise;
import cn.edu.jxnu.domain.CollectStore;
import cn.edu.jxnu.domain.Order;
import cn.edu.jxnu.mapper.CollectMapper;
import cn.edu.jxnu.mapper.CollectMerchandiseMapper;
import cn.edu.jxnu.mapper.CollectStoreMapper;
import cn.edu.jxnu.service.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * #Description ImpCollectService
 *
 * @author xh
 * #Date: 2023/4/2 19:40
 */

@Service
public class ImpCollectService implements CollectService {

    @Autowired
    CollectMapper collectMapper;

    @Autowired
    CollectMerchandiseMapper collectMerchandiseMapper;

    @Autowired
    CollectStoreMapper collectStoreMapper;

    @Override
    public List<Collect> queryCollect(Integer userId) {
        List<Collect> collects = collectMapper.queryCollectByUserId(userId);
        return collects;
    }

    @Override
    public int creatCollect(Collect collect) {
        int i = collectMapper.insertCollect(collect);
        return i;
    }

    @Override
    public List<Collect> collectMerchandiseList(Integer userId) {
        List<Collect> collectMerchandises = collectMapper.queryCollectMerchandiseByUserId(userId);
        return collectMerchandises;
    }

    @Override
    public List<Collect> searchCollectMerchandises(Integer userId, String keyword) {
        String merchandiseName = "%" + keyword + "%";
        String merchandiseIntroduce = "%" + keyword + "%";

        List<Collect> collects1 = collectMapper.findCollectMerchandiseByStateAndMerchandiseName(userId, merchandiseName);
        List<Collect> collects2 = collectMapper.findCollectMerchandiseByStateAndMerchandiseIntroduce(userId, merchandiseIntroduce);

        Set<Collect> collectSet = new HashSet<>();
        collectSet.addAll(collects1);
        collectSet.addAll(collects2);

        List<Collect> collects = new ArrayList<>(collectSet);
        return collects;
    }

    @Override
    public List<Collect> collectStoreList(Integer userId) {
        List<Collect> collectStores = collectMapper.queryCollectStoreByUserId(userId);
        return collectStores;
    }

    @Override
    public int collectMerchandise(CollectMerchandise collectMerchandise) {
        return collectMerchandiseMapper.insertCollectMerchandise(collectMerchandise);
    }

    @Override
    public int cancelCollectMerchandise(CollectMerchandise collectMerchandise) {
        return collectMerchandiseMapper.deleteCollectMerchandise(collectMerchandise);
    }


    @Override
    public int collectStore(CollectStore collectStore) {
        return collectStoreMapper.insertCollectStore(collectStore);
    }

    @Override
    public int cancelCollectStore(CollectStore collectStore) {
        return collectStoreMapper.deleteCollectStore(collectStore);
    }
}