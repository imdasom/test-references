package bj10026;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

/**
 * Created by dasom on 2016-12-13.
 */
public class Main {
    public static int N;
    public static char[][] adj;

    public static int startI = 0;
    public static int startJ = 0;

    public static Queue<Pos> q = new LinkedList<>();
    public static char curColor;
    public static boolean redGreenFlag = false;


    public static void main(String[] args) throws IOException {
        long start = System.nanoTime();
        initValues();

        int nonRed = 0;
        int red = 0;

        while(getStartPoint()){
            nonRed++;
            redGreenFlag = false;

            while(!q.isEmpty()){

                Pos pos = q.poll();

                searchSameColor(pos.i, pos.j-1);
                searchSameColor(pos.i, pos.j+1);
                searchSameColor(pos.i-1, pos.j);
                searchSameColor(pos.i+1, pos.j);
            }

            if(redGreenFlag){
                red++;
            }

        }

        System.out.println(nonRed+" "+(nonRed-red+1));
        long end = System.nanoTime();

        System.out.println((end-start));
    }

    private static void searchSameColor(int i, int j) {
        if(i<0 || i>=N || j<0 || j>=N){
            return;
        }

        char target = adj[i][j];

        char temp = (char) (target + curColor);
        if(temp==153 || temp==185){
            redGreenFlag = true;
        }

        if(target > 'Z' || target!=curColor){
            return;
        }

        q.offer(new Pos(i, j));
        adj[i][j] += 32;

    }

    public static void initValues() throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("day11\\src\\bj10026\\input_data.txt")));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());

        if(N<1 || N>100) return;
        adj = new char[N][N];

        // 직사각형이 그려진 영역은 1로 표시한다.
        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            char[] temps = st.nextToken().toCharArray();
            for(int j=0; j<N; j++){
                char temp = temps[j];
                adj[i][j] = temp;
            }
        }
    }


    public static boolean getStartPoint() {
        for(int i=startI; i<N; i++){
            for(int j=0; j<N; j++){
                if(adj[i][j] <= 'Z'){
                    curColor = adj[i][j];
                    startI = i;
                    startJ = j;
                    q.offer(new Pos(i, j));
                    adj[i][j] += 32;
                    return true;
                }
            }
        }
        return false;
    }
}

class Pos{
    int i;
    int j;

    public Pos(int i, int j) {
        this.i = i;
        this.j = j;
    }
}