import java.awt.*;
import java.awt.event.*;
import java.applet.*;
import javax.swing.*;
public class Calculator extends JApplet implements ActionListener
{
JTextField t1;
JButton b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,b16;

int a,b,c;
String op;

public void init()
{
Container c=getContentPane();
c.setLayout(new FlowLayout());
t1=new JTextField(20);
b1=new JButton("1");
b2=new JButton("2");
b3=new JButton("3");
b4=new JButton("4");
b5=new JButton("5");
b6=new JButton("6");
b7=new JButton("7");
b8=new JButton("8");
b9=new JButton("9");
b10=new JButton("0");
b11=new JButton("+");
b12=new JButton("-");
b13=new JButton("*");
b14=new JButton("/");
b15=new JButton("=");
b16=new JButton("C");
add(t1);
add(b1);
add(b2);
add(b3);
add(b4);
add(b5);
add(b6);
add(b7);
add(b8);
add(b9);
add(b10);
add(b11);
add(b12);
add(b13);
add(b14);
add(b15);
add(b16);
b1.addActionListener(this);
b2.addActionListener(this);
b3.addActionListener(this);
b4.addActionListener(this);
b5.addActionListener(this);
b6.addActionListener(this);
b7.addActionListener(this);
b8.addActionListener(this);
b9.addActionListener(this);
b10.addActionListener(this);
b11.addActionListener(this);
b12.addActionListener(this);
b13.addActionListener(this);
b14.addActionListener(this);
b15.addActionListener(this);
b16.addActionListener(this);
}

public void actionPerformed(ActionEvent ae)
{
if(ae.getActionCommand()=="1")
t1.setText(t1.getText()+"1");

if(ae.getActionCommand()=="2")
t1.setText(t1.getText()+"2");
if(ae.getActionCommand()=="3")
t1.setText(t1.getText()+"3");

if(ae.getActionCommand()=="4")
t1.setText(t1.getText()+"4");

if(ae.getActionCommand()=="5")
t1.setText(t1.getText()+"5");

if(ae.getActionCommand()=="6")
t1.setText(t1.getText()+"6");

if(ae.getActionCommand()=="7")
t1.setText(t1.getText()+"7");

if(ae.getActionCommand()=="8")
t1.setText(t1.getText()+"8");

if(ae.getActionCommand()=="9")
t1.setText(t1.getText()+"9");

if(ae.getActionCommand()=="0")
t1.setText(t1.getText()+"0");

if(ae.getActionCommand()=="+")
{
 a=Integer.parseInt(t1.getText());
 t1.setText("");
op="+";
 
}

if(ae.getActionCommand()=="-")
{
 a=Integer.parseInt(t1.getText());
 t1.setText("");
op="-";
}

if(ae.getActionCommand()=="*")
{
 a=Integer.parseInt(t1.getText());
 t1.setText("");
op="*";
}
if(ae.getActionCommand()=="/")
{
 a=Integer.parseInt(t1.getText());
 t1.setText("");
op="/";
}
if(ae.getActionCommand()=="=")
{

b=Integer.parseInt(t1.getText());
if(op=="+")
 c=a+b;
 
if(op=="-")
 c=a-b;

 if(op=="*")
 c=a*b;
 
if(op=="/")
 c=a/b;

 t1.setText(String.valueOf(c));
}
if(ae.getActionCommand()=="C")
{
t1.setText("");
}
}
}