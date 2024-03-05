package cn.edu.jxnu.service;

import cn.edu.jxnu.domain.Collect;
import cn.edu.jxnu.domain.CollectMerchandise;
import cn.edu.jxnu.domain.CollectStore;

import java.util.List;

public interface CollectService {

    public List<Collect> queryCollect(Integer userId);

    public int creatCollect(Collect collect);

    public List<Collect> collectMerchandiseList(Integer userId);

    public List<Collect> searchCollectMerchandises(Integer userId,String keyword);

    public List<Collect> collectStoreList(Integer userId);

    public int collectMerchandise(CollectMerchandise collectMerchandise);

    public int cancelCollectMerchandise(CollectMerchandise collectMerchandise);

    public int collectStore(CollectStore collectStore);

    public int cancelCollectStore(CollectStore collectStore);

}
