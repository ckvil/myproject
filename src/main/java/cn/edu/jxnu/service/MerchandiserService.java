package cn.edu.jxnu.service;

import cn.edu.jxnu.domain.Merchandise;

import java.util.List;

public interface MerchandiserService {

    public List<Merchandise> merchandiseList();

    public List<Merchandise> searchMerchandise(String keyword);

    public Merchandise merchandiseParticular(Integer merchandiseId);

    public int merchandiseCount(Integer storeId);

    public Merchandise findMerchandise(Integer merchandiseId);

    public int saveMerchandise(Merchandise merchandise);

    public int deleteMyMerchandise(Merchandise merchandise);

    public int editMyMerchandise(Merchandise merchandise);

}
