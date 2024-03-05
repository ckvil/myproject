package cn.edu.jxnu.service;

import cn.edu.jxnu.domain.Appraise;

import java.util.List;

public interface AppraiseService {

    public List<Appraise> query();

    public List<Appraise> queryByMerchandiseId(Integer merchandiseId);

}
