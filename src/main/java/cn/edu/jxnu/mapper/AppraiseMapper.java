package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.Appraise;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AppraiseMapper {

    public List<Appraise> query();

    public List<Appraise> queryByMerchandiseId(Integer merchandiseId);

}
