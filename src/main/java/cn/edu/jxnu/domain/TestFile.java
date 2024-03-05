package cn.edu.jxnu.domain;

import java.util.List;

/**
 * #Description TestFile
 *
 * @author xh
 * #Date: 2023/4/9 18:47
 */

public class TestFile {

    List<String> merchandiseImageArray;

    public List<String> getMerchandiseImageArray() {
        return merchandiseImageArray;
    }

    public void setMerchandiseImageArray(List<String> merchandiseImageArray) {
        this.merchandiseImageArray = merchandiseImageArray;
    }

    @Override
    public String toString() {
        return "TestFile{" +
                "merchandiseImageArray=" + merchandiseImageArray +
                '}';
    }
}